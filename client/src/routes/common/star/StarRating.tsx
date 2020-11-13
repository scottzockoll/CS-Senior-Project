import React from 'react';
import CSS from 'csstype';

type ClickHandler = (event: React.MouseEvent) => void;

interface StarRatingProps {
    currentRating: number;
    numberOfStars: number;
    size: string;
    onClick?: ClickHandler | null;
}

interface StarRatingState {
    currentRating: number;
}

/**
 * Star Rating component that allows users to hover and click the
 * desired rating. If no onClick function is provided, the star
 * selection will be disabled.
 */
class StarRating extends React.Component<StarRatingProps, StarRatingState> {
    styles: CSS.Properties;

    constructor(props: StarRatingProps) {
        super(props);
        this.state = {
            currentRating: this.props.currentRating,
        };

        // Available star sizes
        const sizes: Record<string, string> = { small: '12px', medium: '22px', large: '32px' };

        console.log(this.props.size);
        this.styles = {
            color: 'gray',
            fontSize: !this.props.size ? sizes['small'] : sizes[this.props.size],
        };
    }

    componentDidMount() {
        this.setRating(null);
    }

    hoverHandler = (event: any) => {
        if (this.props.onClick) {
            // Color the hovered level of stars
            const stars = event.target.parentElement.getElementsByClassName('star');
            const hoverValue = event.target.dataset.value;

            Array.from(stars).forEach((star: any) => {
                star.style.color = hoverValue >= star.dataset.value ? 'yellow' : 'gray';
            });
        }
    };

    setRating = (event: any) => {
        const stars = (this.refs.rating as any).getElementsByClassName('star');

        Array.from(stars).forEach((star: any) => {
            star.style.color = this.state.currentRating >= star.dataset.value ? 'yellow' : 'gray';
        });
    };

    starClickHandler = (event: any) => {
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
                            style={this.styles}
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
