import React from 'react';
import { Box } from 'grommet';
import { Star, StarHalf } from 'grommet-icons';

type ClickHandler = (event: React.MouseEvent) => void;

interface StarRatingProps {
    current: number;
    maximum: number;
    onClick?: ClickHandler;
}

interface StarRatingState {
    current: number;
    hover: number;
}

/**
 * Star Rating component that allows users to hover and click the
 * desired rating. If no onClick function is provided, the star
 * selection will be disabled.
 */
class StarRating extends React.Component<StarRatingProps, StarRatingState> {
    constructor(props: StarRatingProps) {
        super(props);

        this.state = {
            current: Math.round(this.props.current),
            hover: -1,
        };
    }

    stars = (count: number, max: number) => {
        const elements: JSX.Element[] = [];
        count = this.state.hover === -1 ? count : this.state.hover;
        count = Math.round(count / 0.5) * 0.5;

        const half = Math.abs(count - Math.floor(count));

        if (half > Number.EPSILON) {
            count -= 1;
            max -= 1;
        }

        for (let i = 0; i < count; i++) {
            elements.push(<Star key={i} color={'gold'} />);
        }

        if (half > Number.EPSILON) {
            elements.push(<StarHalf key={'half'} color={'gold'} />);
            count += 0.5;
        }

        for (let i = count; i < max; i++) {
            elements.push(<Star key={i} />);
        }

        return <React.Fragment>{elements}</React.Fragment>;
    };

    positionToRating = (event: React.MouseEvent) => {
        const target = event.currentTarget as HTMLElement;
        const { left } = target.getBoundingClientRect();

        const percent = (event.clientX - left) / (24 * this.props.maximum);
        let rating = Math.round((percent * this.props.maximum) / 0.5) * 0.5;
        rating = Math.max(0, rating);
        rating = Math.min(rating, this.props.maximum);

        return rating;
    };

    hover = (event: React.MouseEvent) => {
        if (this.props.onClick) {
            this.setState({
                ...this.state,
                hover: this.positionToRating(event),
            });
        }
    };

    leave = (event: React.MouseEvent) => {
        if (this.props.onClick) {
            this.setState({
                ...this.state,
                hover: -1,
            });
        }
    };

    click = (event: React.MouseEvent) => {
        if (this.props.onClick) {
            this.setState({
                ...this.state,
                current: this.positionToRating(event),
            });
            this.props.onClick(event);
        }
    };

    render() {
        return (
            <Box
                direction={'row'}
                style={{
                    minWidth: 24 * this.props.maximum,
                }}
                onMouseOver={this.hover}
                onMouseLeave={this.leave}
                onClick={this.click}
            >
                {this.stars(this.state.current, this.props.maximum)}
            </Box>
        );
    }
}

export default StarRating;
