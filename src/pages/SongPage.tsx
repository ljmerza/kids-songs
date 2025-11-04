import { useParams, Link } from 'react-router-dom';
import { Container, Badge } from 'react-bootstrap';
import { songs } from '../songs';
import TabRenderer from '../TabRenderer';

export function SongPage() {
  const { songId } = useParams<{ songId: string }>();
  const songData = songs.find((s) => s.id === songId);

  if (!songData) {
    return (
      <Container className="py-5 text-center">
        <h2>Song not found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </Container>
    );
  }

  const { song } = songData;

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
