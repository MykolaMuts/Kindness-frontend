const Footer = () => {
  return (
    <footer className="bg-primary-100 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <p>© Developed by Mykola Muts and Fundacja „Głos Młodych”</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Links</h4>
          <a href="https://www.linkedin.com/in/mykola-muts-b4977a245/"
             className="my-5 block hover:text-blue-500 hover:underline">
            Developer LinkedIn
          </a>
          <a href="https://github.com/MykolaMuts"
             className="my-5 block hover:text-blue-500 hover:underline">
            Developer GitHub
          </a>
          <a href="https://fundacjaglosmlodych.org/"
             className="my-5 block hover:text-blue-500 hover:underline">
            Fundacja na Rzecz Promocji i Rozwoju „Głos Młodych”
          </a>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Contact Us</h4>
          <p className="my-5">To contact us, you can write to the developer on LinkedIn</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;