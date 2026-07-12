function Categories() {

    const categories = [
        {
            name: "SUV",
            image: "/images/hyundai_creta_suv.jpg"
        },
        {
            name: "Sedan",
            image: "/images/Honda_City_sedan.jpg"
        },
        {
            name: "Hatchback",
            image: "/images/tata_altroz_hatchback.jpg"
        },
        {
            name: "Electric",
            image: "/images/MG_ZS_electric.jpg"
        },
        {
            name: "Luxury",
            image: "/images/mercedes-benz-luxury.jpg"
        },
        {
            name: "Sports",
            image: "/images/porsche_sports.jpg"
        }
    ];

    return (

        <section className="py-20 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {
                        categories.map((category, index) => (

                            <div
                                key={index}
                                className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                            >

                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                                />

                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

                                    <h2 className="text-white text-3xl font-bold">

                                        {category.name}

                                    </h2>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </section>

    );

}

export default Categories;