import { useParams, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import type { KidsSong } from '../types';
import TabRenderer from '../TabRenderer';
import FancyLoader from '../components/FancyLoader';

export function SongPage() {
  const { songId } = useParams<{ songId: string }>();
  const [song, setSong] = useState<KidsSong | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!songId) {
      setError(true);
      setLoading(false);
      return;
    }

    // Dynamic import - only loads when route is accessed
    import(`../songs/${songId}.ts`)
      .then((module) => {
        setSong(module[songId]);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [songId]);

  if (loading) {
    return (
      <Container className="py-5 d-flex justify-content-center align-items-center">
        <FancyLoader label="Loading song..." />
      </Container>
    );
  }

  if (error || !song) {
    return (
      <Container className="py-5 text-center">
        <h2>Song not found</h2>
        <Link to="/" className="btn btn-kids btn-kids-secondary mt-3">
          Back to Home
        </Link>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="mb-4">
        <Link to="/" className="btn btn-kids btn-kids-ghost mb-3">
          ← Back to All Songs
        </Link>
        <h1>{song.title}</h1>
        <div className="mb-3 d-flex flex-wrap align-items-center">
          <span className="chip chip-category me-2 mb-2">
            {song.category}
          </span>
          {song.tags.map((tag) => (
            <span key={tag} className="chip chip-tag me-2 mb-2">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-muted">
          Tempo: {song.tempo || 100} BPM | Time Signature: {song.time?.num || 4}/{song.time?.den || 4}
        </p>
      </div>
      <TabRenderer song={song} />
    </Container>
  );
}

export default SongPage;
