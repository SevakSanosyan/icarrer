import "./Hero.css";
import HeroLogo from "../../assets/images/logo5.jpeg"
function Hero() {
  return (
    <section className="hero">

      <div className="hero__left">

      <h1>

ԱՇԽԱՏԱՆՔԻ

<span>
  ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆՆԵՐԻ
</span>

<span>
  ՀԱՐԹԱԿ
</span>

</h1>

        <p>

    Ձեր աշխատատեղը Ձեզ է սպասում
        </p>

        <button
  onClick={() => {

    const listingsSection =
      document.getElementById("listings");

    listingsSection.scrollIntoView({
      behavior: "smooth",
    });

  }}
>
 
  ԴԻՏԵԼ ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆՆԵՐԸ
</button>

      </div>

      <div className="hero__right">

        <div className="hero__image">
              <img className="hero__logo"
                src={HeroLogo}
                alt="HeroLogo"
              />
        </div>

      </div>

    </section>
  );
}

export default Hero;