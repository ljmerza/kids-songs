import { useParams, Link } from 'react-router-dom';
import { Container, Badge, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import type { KidsSong } from '../types';
import TabRenderer from '../TabRenderer';

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
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading song...</p>
      </Container>
    );
  }

  if (error || !song) {
    return (
      <Container className="py-5 text-center">
        <h2>Song not found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary mb-3">
          ← Back to All Songs
        </Link>
        <h1>{song.title}</h1>
        <div className="mb-3">
          <Badge bg="primary" className="me-2">
            {song.category}
          </Badge>
          {song.tags.map((tag) => (
            <Badge key={tag} bg="secondary" className="me-1">
              {tag}
            </Badge>
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
