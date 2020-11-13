import React from 'react';

/**
 * Star Rating component that allows users to hover and click the
 * desired rating. If no onClick function is provided, the star
 * selection will be disabled.
 */
class StarRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRating: this.props.currentRating,
        };

        // Available star sizes
        const sizes = { small: '12px', medium: '22px', large: '32px' };

        this.style = {
            color: 'gray',
            fontSize: this.props.size ? sizes['small'] : sizes[this.props.size],
        };
    }

    componentDidMount() {
        this.setRating();
    }

    hoverHandler = (event) => {
        if (this.props.onClick) {
            // Color the hovered level of stars
            const stars = event.target.parentElement.getElementsByClassName('star');
            const hoverValue = event.target.dataset.value;

            Array.from(stars).forEach((star) => {
                star.style.color = hoverValue >= star.dataset.value ? 'yellow' : 'gray';
            });
        }
    };

    setRating = (event) => {
        const stars = this.refs.rating.getElementsByClassName('star');

        Array.from(stars).forEach((star) => {
            star.style.color = this.state.currentRating >= star.dataset.value ? 'yellow' : 'gray';
        });
    };

    starClickHandler = (event) => {
        if (this.props.onClick) {
            let rating = event.target.dataset.value;
            this.setState({ currentRating: rating }); // set state so the rating stays highlighted
            this.props.onClick(rating); // trigger the event up to the parent
        }
    };

    render() {
        return (
            <div className="rating" ref="rating" data-rating={this.state.currentRating} onMouseOut={this.setRating}>
                {[...Array(+this.props.numberOfStars).keys()].map((n) => {
                    return (
                        <span
                            className="star"
                            key={n + 1}
                            data-value={n + 1}
                            onMouseOver={this.hoverHandler}
                            onClick={this.starClickHandler}
                            style={this.style}
                        >
                            &#9733;
                        </span>
                    );
                })}
            </div>
        );
    }
}

export default StarRating;
