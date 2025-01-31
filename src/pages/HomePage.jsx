import { Container, Row, Col } from "react-bootstrap";

const HomePage = () => {
    return (
        <>
            <Container className="py-5">
                {/* Header Section */}
                <Row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img
                        src="/images/actuliLogo.png"
                        alt="logo"
                        style={{
                            width: "25vw",
                            maxWidth: "500px",
                            height: "auto",
                            borderRadius: "20px",
                            margin: "20px",
                        }}
                    />
                </Row>
                <Row className="text-center mb-5">
                    <Col>
                        <h2>Welcome to</h2>
                        <h1 className="display-3 fw-bold color-gold">Actuli</h1>
                        <h2 className="mb-4">Self Actualization. Realized.</h2>
                        <i>
                            self-actualization : noun <br />
                            The realization or fulfillment of one's talents and potentialities... <br />
                            ...the act of becoming the best version of oneself.
                        </i>
                    </Col>
                </Row>

                {/* Introduction Section */}
                <Row className="mb-5">
                    <Col>
                        <p className="lead">
                            One of the hardest questions in life is: out of the THOUSANDS of things I COULD do, what is the ONE thing I SHOULD do?
                        </p>
                        <p className="lead">
                            What are the things that are most important to me, and how can I become a better person while being true to myself?
                        </p>
                        <p>
                            Actuli.com is your personal life coach and planner, designed to help you create meaningful changes in your life. It provides tools to help you balance, manage, and achieve your goals in a way that fits your unique personality and priorities.
                        </p>
                    </Col>
                </Row>

                {/* What Makes Actuli Different? */}
                <Row className="mb-5">
                    <Col>
                        <h3 className="mb-3">What Makes Actuli Different?</h3>
                        <ul>
                            <li>You are the customer, not the product.</li>
                            <li>You own your data and can download or delete it anytime you want.</li>
                            <li>Your personal data is never shared, sold, or distributed.</li>
                            <li>We are a privately owned company with the goal of making meaningful software.</li>
                            <li>Security best practices - professionally managed hosting and security providers, encryption of your data during transit and on the servers, restricted access to information, etc</li>
                            <li>No advertisements.</li>
                            <li>You vote on what features get developed, and which ones do not.</li>
                        </ul>

                    </Col>
                </Row>

                {/* How Actuli Works */}
                <Row className="mb-5">
                    <Col>
                        <h3 className="mb-4">How Does Actuli Work?</h3>

                        <ul>
                            <li>
                                First, you create a comprehensive profile that serves as a snapshot of your current self across eight major areas of life.
                            </li>
                            <li>
                                Second, you prioritize which parts of your life you want to change or improve.
                            </li>
                            <li>
                                Third, anonymous data (never including personally identifiable information) will be sent to an AI that generates customized goals tailored to your interests, needs, and personality.  You choose which ones you want to work on, alter, or throw out.
                            </li>
                            <li>
                                Fourth, Actuli will provide a balanced, actionable list of goals for the month, empowering you to make real progress in the areas that are most important to you.
                            </li>
                            <li>
                                Fifth, throughout the month, you work towards these personal goals with built-in tools to track progress. This keeps you organized and motivated. In the future, we aim to add the ability to invite your friends, who can see your progress and cheer you on.
                            </li>
                            <li>
                                Sixth, at the end of each month, you’ll spend just 15 minutes to reflect, update your priorities, and generate new goals, ensuring your goals evolve as you grow. Over time, Actuli adapts to your changing priorities and ensures your goals stay relevant and personalized.
                            </li>
                        </ul>

                    </Col>
                </Row>

                {/* AI Section */}
                <Row className="mb-5">
                    <Col>
                        <h3>Wait, Did You Say AI?</h3>
                        <p>
                            <strong>What is AI?</strong> Artificial Intelligence (AI) is a technology that processes and learns from data to provide intelligent outputs. In Actuli, AI is used to provide a deeper level of insight into life planning and customization.
                        </p>
                        <p>
                            <strong>How is your data sent and used?</strong> All data is anonymized (removing any personal information) and encrypted to protect your privacy. We only send what’s necessary to help the AI provide actionable results.
                        </p>
                        <p>
                            <strong>Why AI?</strong> Using AI allows the app to provide highly customized goals that are tailored to your needs and interests without designing a custom solution for each person.
                        </p>
                    </Col>
                </Row>

                {/* Next Steps */}
                <Row>
                    <Col>
                        <h3>Next Steps...</h3>
                        <h5>The application is currently in development, and will have a "Notify Me" release option soon.</h5>
                        {/*                        <p>
                            <strong>Free three-month trial:</strong> Start today with zero risk. See for yourself how Actuli can guide you in achieving your goals.
                        </p>
                        <p>
                            <strong>Why do we charge, and what do you get?</strong> Unlike free apps that monetize your data, Actuli charges a small fee to prioritize privacy and quality. Your subscription funds development, security, and innovation.
                        </p>
                        <h5>Plans:</h5>
                        <ul>
                            <li>
                                <strong>Personal Plan:</strong> A tailored experience for individuals seeking personal growth and balance.
                            </li>
                            <li>
                                <strong>Family and Friends Plan:</strong> Work together with loved ones for shared goals, accountability, and growth.
                            </li>
                        </ul>*/}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HomePage;