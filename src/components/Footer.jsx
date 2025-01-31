import {Col, Container, Row} from "react-bootstrap";

const Footer = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Col className="pt-2 text-center">
                            <a href="/about" className="footer-link">About</a>
                            <span className="mx-3">|</span>
                            <a href="/help" className="footer-link">Help</a>
                            <span className="mx-3">|</span>
                            <a href="/privacy" className="footer-link">Privacy</a>
                            <span className="mx-3">|</span>
                            <a href="/terms" className="footer-link">Terms and Conditions</a>
                            {/* Add more links as needed */}
                        </Col>

                        <Row className="justify-content-center">&copy; Actuli.com {new Date().getFullYear()}</Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Footer;