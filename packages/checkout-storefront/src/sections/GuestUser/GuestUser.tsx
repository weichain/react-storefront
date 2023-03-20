export const GuestUser = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p style={{ fontSize: "20px", fontWeight: 600, color: "#1E1E1E" }}>Your Details</p>
        <p style={{ textDecoration: "underline", cursor: "pointer" }}>Edit</p>
      </div>
      <div className="mt-6">
        <p style={{ fontSize: "14px", fontWeight: 400, color: "#8F8F8F" }}>Send to</p>
        <p>[Name]</p>
        <p>[Address]</p>
      </div>
    </div>
  );
};
