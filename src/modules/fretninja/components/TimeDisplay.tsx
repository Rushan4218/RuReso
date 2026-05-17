const TimeDisplay = ({
  time,
  className,
}: {
  time: number;
  className: string;
}) => {
  let minutes = 0;
  let seconds = 0;

  if (time >= 60) {
    minutes = Math.floor(time / 60);
  }
  if (time % 60 !== 0) {
    seconds = time % 60;
  }

  return (
    <span className={className}>
      {minutes >= 10 ? minutes : `0${minutes}`}:
      {seconds >= 10 ? seconds : `0${seconds}`}
    </span>
  );
};

export { TimeDisplay };
