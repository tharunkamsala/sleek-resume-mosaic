
import React from "react";
import { Calendar, MapPin } from "lucide-react";

interface TimelineItemProps {
  position: "left" | "right";
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  position,
  title,
  company,
  location,
  duration,
  description,
  index,
}) => {
  return (
    <div className="relative" style={{ zIndex: 10 - index }}>
      {/* Timeline node */}
      <div 
        className="timeline-node-container" 
        style={{ top: position === "left" ? "calc(50% - 16px)" : "calc(50% - 16px)" }}
      >
        <div className="timeline-node-outer">
          <div className="timeline-node-inner"></div>
        </div>
      </div>
      
      {/* Timeline card */}
      <div className={`timeline-card ${position} hover-lift`}>
        <h3 className="timeline-card-title">{title}</h3>
        <div className="timeline-card-company">{company}</div>
        <div className="timeline-card-duration">
          <Calendar className="w-4 h-4 mr-2" />
          {duration}
          {location && (
            <>
              <span className="mx-2">•</span>
              <MapPin className="w-4 h-4 mr-2" />
              {location}
            </>
          )}
        </div>
        <p className="timeline-card-description">{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
