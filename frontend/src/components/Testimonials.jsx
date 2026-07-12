import {
    Star
} from "lucide-react";

function Testimonials() {

    const testimonials = [

        {
            name: "Raj Nakum",
            image: "/images/male1.jpg",
            review:
                "Excellent service. The vehicle quality exceeded my expectations."
        },

        {
            name: "Priya Shah",
            image: "/images/female1.png",
            review:
                "Very smooth buying experience. Highly recommended dealership."
        },

        {
            name: "Amit Kumar",
            image: "/images/male2.jpg",
            review:
                "Affordable prices and professional staff. I found my dream car."
        }

    ];

    return (

        <section className="py-20 bg-gray-100">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center mb-12">

                    What Our Customers Say

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {

                        testimonials.map((item, index) => (

                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300"
                            >

                                <div className="flex justify-center mb-5">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                                    />

                                </div>

                                <div className="flex justify-center text-yellow-500 mb-4">

                                    <Star fill="currentColor" />
                                    <Star fill="currentColor" />
                                    <Star fill="currentColor" />
                                    <Star fill="currentColor" />
                                    <Star fill="currentColor" />

                                </div>

                                <p className="text-gray-600 italic text-center">

                                    "{item.review}"

                                </p>

                                <h3 className="text-center font-bold text-xl mt-6">

                                    {item.name}

                                </h3>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default Testimonials;