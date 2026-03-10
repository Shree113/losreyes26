import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventsData } from '../data/events';
import styles from './Register.module.css';

import codePoster from '../assets/code-poster.jpg';

const posters = {
  'code-poster.jpg': codePoster
};

const CoordinatorCard = ({ name, role, phone }) => (
  <div className={styles.coordCard}>
    <div className={styles.coordAvatar}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#ff8c00" strokeWidth="1.5"/>
        <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#ff8c00" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
    <div className={styles.coordInfo}>
      <span className={styles.coordName}>{name}</span>
      <span className={styles.coordRole}>{role}</span>
      {phone && <span className={styles.coordPhone}>{phone}</span>}
    </div>
  </div>
);

const Register = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null);
  const [showFullPoster, setShowFullPoster] = useState(false);

  useEffect(() => {
    // Find event in eventsData
    let foundEvent = null;
    
    // Check technical events
    foundEvent = eventsData.day1.technical.find(e => e.id === eventId);
    if (!foundEvent) {
      // Check non-technical events
      foundEvent = eventsData.day1.nonTechnical.find(e => e.id === eventId);
    }
    if (!foundEvent && eventsData.day2.webinar.id === eventId) {
      // Check webinar
      foundEvent = eventsData.day2.webinar;
    }
    
    setEvent(foundEvent);

    if (foundEvent && foundEvent.poster) {
      setPosterUrl(posters[foundEvent.poster] || null);
    } else {
      setPosterUrl(null);
    }

    window.scrollTo(0, 0);
  }, [eventId]);

  const handleRegister = () => {
    if (event.googleFormLink) {
      window.open(event.googleFormLink, '_blank', 'noopener,noreferrer');
    }
  };

  if (!event) {
    return (
      <div className={styles.container}>
        <div className={styles.errorBox}>
          <h2>Event Not Found</h2>
          <Link to="/" className={styles.backLink}>Go Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.registerContent}>
        <Link to="/" className={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 10H5M10 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeJoin="round"/>
          </svg>
          Back to Events
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>REGISTER FOR {event.name}</h1>
          <div className={styles.headerGlow}></div>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Event Overview */}
          <div className={styles.overviewColumn}>
            <div className={styles.detailCard}>
              <h3>EVENT OVERVIEW</h3>
              <p>{event.description}</p>
              
              {event.details && (
                <div className={styles.eventInfo}>
                  <h4>Event Details</h4>
                  <p>{event.details}</p>
                </div>
              )}

              {event.rules && (
                <div className={styles.rulesInfo}>
                  <h4>Rules & Guidelines</h4>
                  <ul>
                    {event.rules.map((rule, i) => (
                      <li key={i}>{rule}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Poster and Registration Action */}
          <div className={styles.actionColumn}>
            {posterUrl && (
              <div className={styles.detailCard}>
                <h3>EVENT POSTER</h3>
                <div 
                  className={styles.posterLink}
                  onClick={() => setShowFullPoster(true)}
                  title="Click to view full size"
                >
                  <div className={styles.posterContainer}>
                    <img src={posterUrl} alt={`${event.name} Poster`} className={styles.eventPoster} />
                    <div className={styles.posterOverlay}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeJoin="round"/>
                      </svg>
                      <span>VIEW FULL SIZE</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className={styles.registerCard}>
              <div className={styles.regIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#ff8c00" strokeWidth="1.5"/>
                  <path d="M8 12l3 3 5-5" stroke="#ff8c00" strokeWidth="1.5" strokeLinecap="round" strokeJoin="round"/>
                </svg>
              </div>
              <h3 className={styles.regCardTitle}>READY TO PARTICIPATE?</h3>
              <p className={styles.regCardDesc}>
                Click the button below to open the official registration form for {event.name}. 
                Make sure to fill in all the required details on the Google Form.
              </p>
              
              <button onClick={handleRegister} className={styles.submitBtn}>
                EVENT REGISTRATION
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.75 9h10.5M10.5 4.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeJoin="round"/>
                </svg>
              </button>
              
              <div className={styles.formNote}>
                * You will be redirected to an external Google Form.
              </div>
            </div>
          </div>
        </div>

        {/* Event Specific Coordinators at the bottom */}
        {event.coordinators && (
          <div className={styles.bottomCoordinators}>
            <h3 className={styles.bottomTitle}>EVENT COORDINATORS</h3>
            <div className={styles.bottomCoordsGrid}>
              {event.coordinators.staff && (
                <div className={styles.bottomCoordSection}>
                  <h4>STAFF COORDINATORS</h4>
                  <div className={styles.coordsList}>
                    {event.coordinators.staff.map((c, i) => (
                      <CoordinatorCard key={i} {...c} />
                    ))}
                  </div>
                </div>
              )}
              {event.coordinators.student && (
                <div className={styles.bottomCoordSection}>
                  <h4>STUDENT COORDINATORS</h4>
                  <div className={styles.coordsList}>
                    {event.coordinators.student.map((c, i) => (
                      <CoordinatorCard key={i} {...c} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Full Size Poster Modal */}
      {showFullPoster && (
        <div className={styles.modalOverlay} onClick={() => setShowFullPoster(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setShowFullPoster(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeJoin="round"/>
              </svg>
            </button>
            <img src={posterUrl} alt={`${event.name} Full Poster`} className={styles.fullPosterImg} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
