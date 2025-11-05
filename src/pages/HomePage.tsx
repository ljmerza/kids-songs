import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { songMetadata } from '../songs/metadata';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import type Fuse from 'fuse.js';
import type { SongMetadata } from '../types';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(() => queryParam);
  const lastSyncedQueryParamRef = useRef(queryParam);
  const debouncedQuery = useDebouncedValue(query, 250);
  const [fuse, setFuse] = useState<Fuse<SongMetadata> | null>(null);
  const selectedCategory = searchParams.get('category') ?? '';
  const selectedTag = searchParams.get('tag') ?? '';

  useEffect(() => {
    if (queryParam !== lastSyncedQueryParamRef.current) {
      lastSyncedQueryParamRef.current = queryParam;
      setQuery(queryParam);
    }
  }, [queryParam]);

  const { categories, tags } = useMemo(() => {
    const categorySet = new Set<string>();
    const tagSet = new Set<string>();

    for (const song of songMetadata) {
      categorySet.add(song.category);
      for (const tag of song.tags) {
        tagSet.add(tag);
      }
    }

    return {
      categories: Array.from(categorySet).sort((a, b) => a.localeCompare(b)),
      tags: Array.from(tagSet).sort((a, b) => a.localeCompare(b)),
    };
  }, []);

  const filtersActive = Boolean(queryParam.length || selectedCategory || selectedTag);

  const updateFilters = useCallback((updates: {
    query?: string;
    category?: string | null;
    tag?: string | null;
    replace?: boolean;
  }) => {
    const baseParams = new URLSearchParams(searchParams);

    if (updates.query !== undefined) {
      if (updates.query.trim().length) {
        baseParams.set('q', updates.query);
      } else {
        baseParams.delete('q');
      }
    }

    if (updates.category !== undefined) {
      if (updates.category && updates.category.length) {
        baseParams.set('category', updates.category);
      } else {
        baseParams.delete('category');
      }
    }

    if (updates.tag !== undefined) {
      if (updates.tag && updates.tag.length) {
        baseParams.set('tag', updates.tag);
      } else {
        baseParams.delete('tag');
      }
    }

    setSearchParams(baseParams, updates.replace ? { replace: true } : undefined);
  }, [searchParams, setSearchParams]);

  const handleSearchSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateFilters({ query });
  }, [query, updateFilters]);

  useEffect(() => {
    let disposed = false;

    async function loadFuse() {
      const { default: FuseModule } = await import('fuse.js');
      if (disposed) {
        return;
      }

      setFuse(() => new FuseModule<SongMetadata>(songMetadata, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'category', weight: 0.3 },
          { name: 'tags', weight: 0.2 },
        ],
        ignoreLocation: true,
        includeMatches: true,
        threshold: 0.35,
        minMatchCharLength: 2,
      }));
    }

    loadFuse();

    return () => {
      disposed = true;
    };
  }, []);

  const filteredSongs = useMemo(() => {
    const searchTerm = debouncedQuery.trim();
    let baseSongs: Array<SongMetadata> = songMetadata;

    if (searchTerm.length) {
      if (fuse) {
        baseSongs = fuse.search(searchTerm).map((result) => result.item);
      } else {
        const lowered = searchTerm.toLowerCase();
        baseSongs = songMetadata.filter((song) =>
          song.title.toLowerCase().includes(lowered) ||
          song.category.toLowerCase().includes(lowered) ||
          song.tags.some((tag) => tag.toLowerCase().includes(lowered))
        );
      }
    }

    return baseSongs.filter((song) => {
      if (selectedCategory && song.category !== selectedCategory) {
        return false;
      }

      if (selectedTag && !song.tags.includes(selectedTag)) {
        return false;
      }

      return true;
    });
  }, [debouncedQuery, fuse, selectedCategory, selectedTag]);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="hero-heading">
          <span className="hero-heading-kids">
            <span className="hero-heading-note" aria-hidden="true" />
            Kids Songs
          </span>
          <span className="d-block">Guitar Tabs</span>
        </h1>
      </div>
      <Form className="mb-4" onSubmit={handleSearchSubmit}>
        <Form.Control
          type="search"
          placeholder="Search by song name, category, or tag..."
          aria-label="Search songs"
          value={query}
          onChange={(event) => {
            const nextQuery = event.target.value;
            setQuery(nextQuery);
            updateFilters({ query: nextQuery });
          }}
        />
      </Form>
      <Row className="g-3 mb-4">
        <Col xs={12} md={4}>
          <Form.Group controlId="categoryFilter">
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(event) => {
                const nextCategory = event.target.value;
                updateFilters({ category: nextCategory || null });
              }}
              aria-label="Filter songs by category"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="tagFilter">
            <Form.Label className="fw-semibold">Tags</Form.Label>
            <Form.Select
              value={selectedTag}
              onChange={(event) => {
                const nextTag = event.target.value;
                updateFilters({ tag: nextTag || null });
              }}
              aria-label="Filter songs by tag"
            >
              <option value="">All tags</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={2} className="d-flex align-items-end">
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() => {
              setQuery('');
              updateFilters({ query: '', category: null, tag: null });
            }}
            disabled={!filtersActive}
          >
            Clear filters
          </Button>
        </Col>
      </Row>
      {filteredSongs.length === 0 ? (
        <p className="text-center text-muted">
          No songs match your search yet. Try a different keyword or check your spelling.
        </p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredSongs.map((song) => (
            <Col key={song.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{song.title}</Card.Title>
                  <div className="mb-3">
                    <span className="chip chip-category me-2">{song.category}</span>
                    <div className="mt-2 d-flex flex-wrap">
                      {song.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="chip chip-tag me-2 mb-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Card.Text className="text-muted small">
                    Tempo: {song.tempo || 100} BPM<br />
                    Time: {song.time?.num || 4}/{song.time?.den || 4}
                  </Card.Text>
                  <Link
                    to={`/song/${song.id}`}
                    className="btn btn-kids btn-kids-primary mt-auto"
                  >
                    Play Song
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default HomePage;
