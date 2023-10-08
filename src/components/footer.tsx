export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-40 w-full border-t p-4">
      <div className="container flex flex-wrap items-center justify-between gap-4">
        <p>Copyright {year.toString()}</p>

        <p>Made with passion by Ahmad, Islom and Behruz</p>
      </div>
    </footer>
  );
}
