import React from 'react';
import palette from '../../lib/styles/palette'
import styled from 'styled-components';

interface StyledTitleProps extends React.HTMLProps<HTMLFontElement> {
    color?: string,
    fontSize?: number | string,
};

function StyledTitle(props: StyledTitleProps) {
    const { color = palette.primaryMain, fontSize = 'inherit', children, ...rest } = props;
    const htmlProps = rest as any;

    return (
        <StyledTitleText color={color} size={fontSize} {...htmlProps}>
            {children}
        </StyledTitleText>
    );
}

const StyledTitleText = styled.h1<{ color: string, size: number | string }>`
    color: ${(props) => props.color};
    font-size: ${(props) => (typeof props.size === 'number') ? props.size + "px" : props.size};
`

export default StyledTitle;
