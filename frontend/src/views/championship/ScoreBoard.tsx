import React, { useEffect, useState } from "react";
import CollapseAccordion from "./CollapseAccordion";
import HttpService from "../../services/client"

interface IScore{
    score: number;
    user: string;
}

const ScoreBoard = ({id}: {id: string}) => {

    const [scores,setScores] = useState<IScore[]>([]);
  
    useEffect(() => {
        const consumeApi = async () => {
            const scores: IScore[] = await (
                await HttpService.httpGet(`/championships/${id}/score`)
              ).data.scores;
              scores.sort((a,b) => a.score - b.score);
           setScores(scores);
        }

        consumeApi();
    },[])

  return (
    <>
      <CollapseAccordion
        scores={scores}
        header={
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-list-numbers"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#00abfb"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11 6h9" />
              <path d="M11 12h9" />
              <path d="M12 18h8" />
              <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" />
              <path d="M6 10v-6l-2 2" />
            </svg>
          </>
        }
      />
    </>
  );
};

export default ScoreBoard;
