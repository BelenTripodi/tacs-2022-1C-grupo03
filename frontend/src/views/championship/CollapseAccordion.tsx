import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import React from "react";

interface IScore{
  score: number;
  user: string;
}

const CollapseAccordion = ({
  scores,
  header,
}: {
  scores: IScore[];
  header: React.ReactElement;
}) => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{header}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {
              scores.map((score) => <Stack>{score.user} - {score.score}</Stack>)
            }
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CollapseAccordion;
