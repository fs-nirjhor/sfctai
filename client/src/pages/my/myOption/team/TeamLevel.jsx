import { useState } from "react";
import TeamMember from "./TeamMember";

const TeamLevel = () => {
  const [level, setLevel] = useState('1');
  const levels = ['1','2','3'];
  const activeButton = "btn btn-warning bg-myPrimary text-white font-semibold"
  const inactiveButton = "btn btn-warning bg-white text-myPrimary font-semibold"
    return (
        <article>
            <h4 className="text-sm text-center">Members</h4>
            <nav className="grid grid-cols-3 gap-5 mt-2" id="member-nav">
            {levels.map(id =>  <button
                    className={id == level ? activeButton : inactiveButton}
                    key={id}
                    onClick={() => setLevel(id)}
                >
                    Level {id}
                </button>
                )}
            </nav>
             <TeamMember id={level}/>
        </article>
    );
};

export default TeamLevel;
