import { ReactComponent as Some } from "../../assets/some.svg";
import { ReactComponent as Some2 } from "../../assets/some2.svg";

const Footer = () => {
    return(
        <>
            <footer className="bottom-0 shrink-0 relative w-full mt-14">

                <div className="bg-black rounded-t-3xl pt-14 pb-6 px-12">
                    
                    <div className="text-white ">
                        <div>
                            <h2 className="text-4xl">The most popular book today.</h2>
                        </div>
                        <div className="my-4">
                            <h3>New Recommendation.</h3>
                        </div>
                        <div className="mb-4 bg-[#0BB927] inline-block rounded-2xl px-3">
                            <h4 className="align-middle">Explore</h4>
                        </div>
                    </div>

                    <div className="text-white py-10">

                        <div className="relative">

                            <div>
                                <img className="w-full" src="https://picsum.photos/200/300" alt="Sup"></img>
                            </div>

                            <div className="absolute bottom-10 w-full px-10">
                                <p className="text-2xl">How Innovation Works?</p>
                                <div>
                                    <p className="text-sm">Authors: <span className="underline">Matt Rideley</span></p>
                                    <p className="text-sm">General: <span className="underline">Fantasy, Fiction</span></p>
                                </div>
                            </div>
                            
                        </div>

                    </div>

                    <div className="text-white grid grid-cols-2 place-items-center gap-2 mx-auto">
                        
                        <div>
                            <Some2 />
                        </div>  

                        <div>
                            <Some />
                        </div>

                    </div>

                    <div className="text-white text-center mx-auto pt-8">
                        <h4>Made with ❤️ by Team DigitCrib</h4>
                    </div>

                </div>


            </footer>
        </>
    )
}

export default Footer;