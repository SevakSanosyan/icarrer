return (

  <div className="single">

    <div className="single__image">

      <img
        src={`http://localhost:5000${listing.image}`}
        alt=""
      />

    </div>

    <div className="single__content">

      <div className="single__top">

        <h1>
          {listing.title}
        </h1>

        {
          listing.price && (

            <div className="single__price">

              {listing.price} ֏

            </div>

          )
        }

      </div>

      <p>

        {listing.description}

      </p>

      <div className="single__bottom">

        <span>

          {listing.userEmail}

        </span>

      </div>

    </div>

  </div>

);