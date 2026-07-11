import {
    ShieldCheck,
    BadgeDollarSign,
    CarFront,
    Headset
} from "lucide-react";

function WhyChooseUs() {

    const features = [

        {
            title: "Certified Vehicles",
            description:
                "Every vehicle is inspected and certified before listing.",
            icon: <ShieldCheck size={45} />
        },

        {
            title: "Best Price Guarantee",
            description:
                "We offer competitive pricing with complete transparency.",
            icon: <BadgeDollarSign size={45} />
        },

        {
            title: "Wide Collection",
            description:
                "Choose from SUVs, Sedans, Electric and Luxury vehicles.",
            icon: <CarFront size={45} />
        },

        {
            title: "24/7 Customer Support",
            description:
                "Our team is always available to help you.",
            icon: <Headset size={45} />
        }

    ];

    return (

        <section className="py-20 bg-gray-100">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {

                        features.map((feature, index) => (

                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center"
                            >

                                <div className="text-blue-600 flex justify-center mb-5">

                                    {feature.icon}

                                </div>

                                <h2 className="text-2xl font-bold mb-3">

                                    {feature.title}

                                </h2>

                                <p className="text-gray-600">

                                    {feature.description}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default WhyChooseUs;