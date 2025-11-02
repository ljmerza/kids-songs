import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { songs } from '../songs';

export function HomePage() {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Kids Songs Guitar Tabs</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {songs.map(({ id, song }) => (
          <Col key={id}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{song.title}</Card.Title>
                <div className="mb-3">
                  <span className="badge bg-primary me-2">{song.category}</span>
                  <div className="mt-2">
                    {song.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="badge bg-secondary me-1 mb-1">
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
                  to={`/song/${id}`}
                  className="btn btn-success mt-auto"
                >
                  Play Song
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
