import "./Hero.css";
import HeroLogo from "../../assets/images/logo1.jpeg"
function Hero() {
  return (
    <section className="hero">

      <div className="hero__left">

        <h1>
          Տեղադրեք Ձեր 
          <span>
            հայտարարությունը
          </span>
        </h1>

        <p>
          Արագ, հեշտ և հարմար տարբերակ
          Ձեր ծառայությունը կամ ապրանքը
          ներկայացնելու համար։
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
  Դիտել հայտարարությունները
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