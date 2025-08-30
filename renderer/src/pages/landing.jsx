import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css'
import logo from '../assets/elix-logo.jpg'

const Landing = () => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-section').forEach(section => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landing-container">
            <section className="hero-section">
                <div className="hero-content">
                    <div className="logo-container">
                        <img src={logo} alt="ChronOS Logo" className="hero-logo" />
                    </div>
                    <h1 className="hero-title">
                        <span className="gradient-text">ChronOS</span>
                        <span className="hero-subtitle">The Time-Shifted Work OS • Powered by Elix</span>
                    </h1>
                    <p className="hero-tagline">Work Begins Where Prep Work Ends</p>
                    <button 
                        className="cta-button pulse"
                        onClick={() => navigate('/signin')}
                    >
                        Experience the Future
                    </button>
                </div>
                <div className="hero-background"></div>
                <div className="scroll-down">
                    <p ref={scrollRef} className="scroll-text">
                        Discover More ↓
                    </p>
                </div>
            </section>

            <section className="scroll-section features-section">
                <h2 className="section-title">The Hidden Tax on Modern Work</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">⏰</div>
                        <h3>70% Meta-Work</h3>
                        <p>Most of your day is consumed by scheduling, searching, updating, and reporting instead of creating</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>40% Productivity Loss</h3>
                        <p>Context-switching from Slack pings, meeting invites, and emails destroys your focus flow</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💸</div>
                        <h3>Millions in Coordination Tax</h3>
                        <p>Remote-first teams spend double the time just staying aligned, costing companies millions yearly</p>
                    </div>
                </div>
            </section>

            <section className="scroll-section tutorial-section">
                <h2 className="section-title">ChronOS: Your Invisible Teammate</h2>
                <div className="tutorial-steps">
                    <div className="step">
                        <div className="step-number">PAF</div>
                        <div className="step-content">
                            <h3>Predictive Artifact Factory</h3>
                            <p>Automatically generates meeting briefs, checklists, starter PRs, and notes before you need them</p>
                            <div className="prompt-example">
                                <p>"Elix, prepare me for the 3 PM product review dot"</p>
                            </div>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">AX</div>
                        <div className="step-content">
                            <h3>Attention Exchange</h3>
                            <p>Manages your attention like currency - negotiating meetings, bundling notifications, filtering noise</p>
                            <div className="prompt-example">
                                <p>"Elix, protect my deep work until noon dot"</p>
                            </div>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">OS</div>
                        <div className="step-content">
                            <h3>Organizational Simulation</h3>
                            <p>Runs what-if scenarios on projects, predicting risks and bottlenecks before they become crises</p>
                            <div className="prompt-example">
                                <p>"Elix, what's the impact if the UI task is delayed by two days dot"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="scroll-section features-section">
                <h2 className="section-title">Command the Future of Work</h2>
                <div className="prompt-grid">
                    <div className="prompt-card">
                        <p>"Elix, get me up to speed for my meeting with Anna dot"</p>
                    </div>
                    <div className="prompt-card">
                        <p>"Elix, create a Jira ticket for this authentication bug dot"</p>
                    </div>
                    <div className="prompt-card">
                        <p>"Elix, what's on my critical path today dot"</p>
                    </div>
                    <div className="prompt-card">
                        <p>"Elix, run a risk analysis on the current sprint dot"</p>
                    </div>
                    <div className="prompt-card">
                        <p>"Elix, draft the quarterly review presentation dot"</p>
                    </div>
                    <div className="prompt-card">
                        <p>"Elix, find all blockers across my projects dot"</p>
                    </div>
                </div>
            </section>

            <section className="scroll-section tutorial-section">
                <h2 className="section-title">The Symphony of Elix and ChronOS</h2>
                <div className="tutorial-steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>You Speak to Elix</h3>
                            <p>Natural voice commands, just like talking to a human assistant. Say <span className="code">"Elix"</span> followed by your command and <span className="code">"dot"</span></p>
                            <div className="prompt-grid">
                                <div className="prompt-card">
                                    <p>"Elix, analyze my calendar for focus time dot"</p>
                                </div>
                                <div className="prompt-card">
                                    <p>"Elix, summarize yesterday's standup notes dot"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>ChronOS Executes</h3>
                            <p>The AI engine pulls context from your calendar, Jira, Slack, and GitHub, then generates artifacts using advanced AI</p>
                            <div className="prompt-example">
                                <p>Integrations: Slack • Google Calendar • Jira • GitHub • Figma • Notion</p>
                            </div>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>Elix Delivers</h3>
                            <p>Results presented visually on screen and confirmed with spoken response. Your work is ready, prep already done</p>
                            <div className="prompt-example">
                                <p>"Done. I've prepared your brief and flagged a potential delay in the authentication API."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="scroll-section features-section">
                <h2 className="section-title">Why ChronOS is Different</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎙️</div>
                        <h3>Voice-First, Hands-Free</h3>
                        <p>Natural language interface powered by Elix - no forms, no clicking, just conversation</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📋</div>
                        <h3>Artifacts, Not Alerts</h3>
                        <p>Produces tangible outputs - drafts, briefs, simulations - not just another notification</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔮</div>
                        <h3>Predictive, Not Reactive</h3>
                        <p>Anticipates needs and prepares work before you ask, shifting from reactive to proactive</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🧠</div>
                        <h3>System-Wide Intelligence</h3>
                        <p>Connects all your tools into a single proactive workflow, beyond siloed AI helpers</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>30-40% Time Reclaimed</h3>
                        <p>Reduce coordination overhead and context-switching, reclaim mental bandwidth for deep work</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🚀</div>
                        <h3>Ship Faster</h3>
                        <p>Eliminate bottlenecks with proactive risk mitigation and automated coordination</p>
                    </div>
                </div>
            </section>

            <section className="scroll-section tutorial-section">
                <h2 className="section-title">The Road Ahead</h2>
                <div className="tutorial-steps">
                    <div className="step">
                        <div className="step-number">🤖</div>
                        <div className="step-content">
                            <h3>Multi-Agent Orchestration</h3>
                            <p>Your ChronOS agent will negotiate directly with agents from other teams, eliminating coordination overhead</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">🧬</div>
                        <div className="step-content">
                            <h3>Organizational Memory</h3>
                            <p>A company-wide knowledge graph that remembers every decision, preventing history from repeating itself</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">🌊</div>
                        <div className="step-content">
                            <h3>The Adaptive Workplace</h3>
                            <p>ChronOS learns team rhythms and automatically optimizes workflows for well-being and productivity</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="scroll-section final-cta">
                <h2>Reclaim Your Cognitive Cycles</h2>
                <p className="hero-tagline">Experience work that begins, fully formed, at the moment of command</p>
                <button 
                    className="cta-button pulse"
                    onClick={() => navigate('/signin')}
                >
                    Start Your Free Trial
                </button>
            </section>
        </div>
    );
};

export default Landing;