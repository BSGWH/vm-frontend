import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a href="/" className="font-bold text-xl flex">
            <img
              src={"/logos/oneRowBlack.png"}
              alt="Logo"
              className="w-6/12 object-cover object-top"
            />
          </a>
        </div>

        <div className="flex flex-col gap-2">
        </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">About</h3>
            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Features
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Pricing
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
								Terms & Conditions
              </a>
            </div>

						<div>
              <a href="#" className="opacity-60 hover:opacity-100">	
								Privacy Policy
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Community</h3>
            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Youtube
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Twitter
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                LinkedIn
              </a>
            </div>
          </div>
        {/* </div> */}
      </section>
    </footer>
  );
};
