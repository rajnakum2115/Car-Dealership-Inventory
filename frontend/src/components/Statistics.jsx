import {
    Car,
    Users,
    Building2,
    Award
} from "lucide-react";

function Statistics() {

    const stats = [

        {
            icon: <Car size={45} />,
            number: "500+",
            title: "Cars Available"
        },

        {
            icon: <Users size={45} />,
            number: "1000+",
            title: "Happy Customers"
        },

        {
            icon: <Building2 size={45} />,
            number: "50+",
            title: "Top Brands"
        },

        {
            icon: <Award size={45} />,
            number: "10+",
            title: "Years Experience"
        }

    ];

    return (

        <section className="bg-blue-700 py-20">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {

                        stats.map((item, index) => (

                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition duration-300"
                            >

                                <div className="text-blue-600 flex justify-center mb-4">

                                    {item.icon}

                                </div>

                                <h2 className="text-4xl font-bold text-gray-800">

                                    {item.number}

                                </h2>

                                <p className="mt-3 text-gray-600">

                                    {item.title}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default Statistics;