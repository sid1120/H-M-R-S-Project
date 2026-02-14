const Card = ({ children }) => {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded shadow-sm">
      {children}
    </div>
  );
};

export default Card;
