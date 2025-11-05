import { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { songMetadata } from '../songs/metadata';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import type Fuse from 'fuse.js';
import type { SongMetadata } from '../types';

export function HomePage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 250);
  const [fuse, setFuse] = useState<Fuse<SongMetadata> | null>(null);

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
    if (!searchTerm.length) {
      return songMetadata;
    }
    if (fuse) {
      return fuse.search(searchTerm).map((result) => result.item);
    }
    const lowered = searchTerm.toLowerCase();
    return songMetadata.filter((song) =>
      song.title.toLowerCase().includes(lowered) ||
      song.category.toLowerCase().includes(lowered) ||
      song.tags.some((tag) => tag.toLowerCase().includes(lowered))
    );
  }, [debouncedQuery, fuse]);

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
      <Form className="mb-4">
        <Form.Control
          type="search"
          placeholder="Search by song name, category, or tag..."
          aria-label="Search songs"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Form>
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
