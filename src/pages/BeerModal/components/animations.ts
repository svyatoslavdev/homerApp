import { keyframes } from "@emotion/react";

const littleShakingKeyFrames = keyframes`
  0%,
	100% {
		transform: rotate(0deg);
		transform-origin: 50% 50%;
	}

	15% {
		transform: rotate(-6deg);
	}

	30% {
		transform: rotate(6deg);
	}

	45% {
		transform: rotate(-3.6deg);
	}

	60% {
		transform: rotate(2.4deg);
	}

	75% {
		transform: rotate(-1.2deg);
	}
`;

const smallShakingKeyFrames = keyframes`
  0%,
	100% {
		transform: rotate(0deg);
		transform-origin: 50% 50%;
	}

	15% {
		transform: rotate(-9deg);
	}

	30% {
		transform: rotate(9deg);
	}

	45% {
		transform: rotate(-6.6deg);
	}

	60% {
		transform: rotate(5.4deg);
	}

	75% {
		transform: rotate(-3.2deg);
	}
`;

const normalShakingKeyFrames = keyframes`
  0%,
	100% {
		transform: rotate(0deg);
		transform-origin: 50% 50%;
	}

	15% {
		transform: rotate(-12deg);
	}

	30% {
		transform: rotate(12deg);
	}

	45% {
		transform: rotate(-9.6deg);
	}

	60% {
		transform: rotate(8.4deg);
	}

	75% {
		transform: rotate(-7.2deg);
	}
`;

const bigShakingKeyFrames = keyframes`
  0%,
	100% {
		transform: rotate(0deg);
		transform-origin: 50% 50%;
	}

	15% {
		transform: rotate(-15deg);
	}

	30% {
		transform: rotate(15deg);
	}

	45% {
		transform: rotate(-12.6deg);
	}

	60% {
		transform: rotate(11.4deg);
	}

	75% {
		transform: rotate(-10.2deg);
	}
`;

const hugeShakingKeyFrames = keyframes`
  0%,
	100% {
		transform: rotate(0deg);
		transform-origin: 50% 50%;
	}

	15% {
		transform: rotate(-18deg);
	}

	30% {
		transform: rotate(18deg);
	}

	45% {
		transform: rotate(-15.6deg);
	}

	60% {
		transform: rotate(14.4deg);
	}

	75% {
		transform: rotate(-13.2deg);
	}
`;

export const shakingAnimations = [
  littleShakingKeyFrames,
  smallShakingKeyFrames,
  normalShakingKeyFrames,
  bigShakingKeyFrames,
  hugeShakingKeyFrames,
];
