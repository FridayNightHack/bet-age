const BetButton = ({
  matchId,
  team1,
  team2,
  marketName,
  betType,
  odds,
  localized,
  matchDate,
  isInSlip,
  onAddToSlip,
}) => {
  const checkCoupon = () => {
    onAddToSlip({
      matchId,
      localized,
      matchDate,
      team1,
      team2,
      marketName,
      betType,
      odds,
    });
  };

  return (
    <>
      <button
        className={`markets-type flex flex-row justify-between bg-dark-medium px-2 rounded-sm border border-transparent text-light-gray hover:border-blue-400 ${
          isInSlip && '!bg-[#4D7BB2] !text-white hover:bg-[#305D91]'
        }`}
        onClick={checkCoupon}>
        <span className="markets-owner">{betType}</span>
        <span className="markets-odd">{odds.toFixed(2)}</span>
      </button>
    </>
  );
};

export default BetButton;
