export default function ProductPage({ type }) {
  return (
    <div>
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Page</h2>
      <p>Products for {type}</p>
    </div>
  );
}