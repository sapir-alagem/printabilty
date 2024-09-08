// components/CelebrationConfetti.js
import React from "react";
import Confetti from "react-confetti";

const CelebrationConfetti = () => (
  <Confetti
    width={window.innerWidth}
    height={window.innerHeight}
    recycle={false}
    numberOfPieces={300}
    gravity={0.1}
    initialVelocityX={{ min: -15, max: 15 }}
    initialVelocityY={{ min: -30, max: 30 }}
  />
);

export default CelebrationConfetti;
