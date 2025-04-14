import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-base-100">
      <img
        src="https://i.imgur.com/qIufhof.png" // Puedes cambiar esta URL por otra imagen que prefieras
        alt="Página no encontrada"
        className="w-80 mb-6"
      />
      <h1 className="text-5xl font-bold text-error mb-2">404</h1>
      <p className="text-lg mb-6">Oops, la página que buscás no existe.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  );
}
