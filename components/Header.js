export default function Header({ title = 'POS' }) {
    return (
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="text-sm text-slate-600">LALA TECH POS</div>
      </header>
    );
  }
  