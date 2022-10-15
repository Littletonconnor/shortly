function Footer() {
  return (
    <footer className="border-t border-[#20293A] pt-10 pb-12">
      <div className="mx-auto flex max-w-7xl justify-between px-4">
        <p className="text-sm text-gray-400">
          Copywright &copy; {new Date().getFullYear()}
        </p>
        <a className="text-sm text-gray-400" href="https://www.buildui.com">
          Design inspired by Build UI
        </a>
      </div>
    </footer>
  );
}

export default Footer;
