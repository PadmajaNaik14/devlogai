import {
  Globe,
  Code,
  Mail,
  Send
} from "lucide-react";

export default function ContactSection() {

  return (

    <section

      id="contact"

      className="

      py-28

      bg-gradient-to-b

      from-emerald-50

      to-white

      "

    >

      <div className="max-w-7xl mx-auto px-8">

        <p className="text-center text-[#89023E] font-semibold">

          Contact

        </p>

        <h2

          className="

          text-5xl

          font-bold

          text-center

          mt-3

          "

        >

          Get In Touch

        </h2>

        <p

          className="

          text-center

          text-gray-500

          mt-5

          max-w-2xl

          mx-auto

          "

        >

          Interested in DevLog AI or have feedback?

          Feel free to reach out.

        </p>

        <div

          className="

          mt-16

          grid

          lg:grid-cols-2

          gap-16

          "

        >

          {/* Right */}

          <div className="space-y-6">

            <div

              className="

              flex

              items-center

              gap-4

              bg-white

              rounded-2xl

              p-6

              shadow-lg

              "

            >

              <Globe />

              <div>

                <h3 className="font-bold">

                  GitHub

                </h3>

                <p className="text-gray-500">

                  github.com/PadmajaNaik14

                </p>

              </div>

            </div>

            <div

              className="

              flex

              items-center

              gap-4

              bg-white

              rounded-2xl

              p-6

              shadow-lg

              "

            >

              <Code />

              <div>

                <h3 className="font-bold">

                  LinkedIn

                </h3>

                <p className="text-gray-500">

                  linkedin.com/in/padmajagnaik14

                </p>

              </div>

            </div>

            <div

              className="

              flex

              items-center

              gap-4

              bg-white

              rounded-2xl

              p-6

              shadow-lg

              "

            >

              <Mail />

              <div>

                <h3 className="font-bold">

                  Email

                </h3>

                <p className="text-gray-500">

                  padmajagnaik@gmail.com

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}