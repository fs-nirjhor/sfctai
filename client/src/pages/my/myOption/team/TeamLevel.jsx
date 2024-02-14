import { useState } from "react";
import TeamMember from "./TeamMember";

const TeamLevel = ({user}) => {
  const [level, setLevel] = useState('1');
  const levels = ['1','2','3'];
  const activeButton = "btn btn-primary font-semibold"
  const inactiveButton = "btn btn-primary bg-white text-black font-semibold"
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
             <TeamMember levelId={level} user={user}/>
        </article>
    );
};

export default TeamLevel;
