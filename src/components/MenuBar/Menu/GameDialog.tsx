import React, { PropsWithChildren, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

import Video from 'twilio-video';

interface GameDialogProps {
  open: boolean;
  onClose(): void;
}

function GameDialog({ open, onClose }: PropsWithChildren<GameDialogProps>) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState();

  const startGame = () => {
    const timer = setInterval(function() {
      setIndex(Math.floor(Math.random() * 6));
    }, 2000);
    //setTimer(timer);
  };
  const endGame = () => {
    clearInterval(timer);
    setScore(0);
    setIndex(0);
  };
  const onClick = (n: number) => {
    if (index === n) {
      setScore(score => score + 1);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>Whack-A-Jack</DialogTitle>
      <Divider />
      <DialogContent>
        <div>
          <style>
            {`
        .hole {
          width: 50px;
          height: 50px;
          border: 1px solid black;
          border-radius: 50%;
        }
        
        .container {
          display: inline-block;
        }
        
        img {
          width: 50px;
          height: 50px;
        }
      `}
          </style>
          <button onClick={startGame}>start game</button>
          <button onClick={endGame}>end game</button>
          <p>score: {score}</p>
          <div>
            {Array(6)
              .fill(0, 5)
              .map((_, n) => {
                if (index === n) {
                  return (
                    <div className="container">
                      <img
                        src="https://img.icons8.com/color/96/000000/jack-o-lantern--v1.png"
                        alt="mole"
                        onClick={() => onClick(n)}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className="container">
                      <div className="hole"></div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GameDialog;
