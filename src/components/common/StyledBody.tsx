import React from 'react';
import palette from '../../lib/styles/palette'
import styled from 'styled-components';

interface StyledBodyProps extends React.HTMLProps<HTMLFontElement> {
    color?: string,
    fontSize?: number | string,
};

function StyledBody(props: StyledBodyProps) {
    const { color = palette.primaryMain, fontSize = 'inherit', children, ...rest } = props;
    const htmlProps = rest as any;

    return (
        <StyledBodyText color={color} size={fontSize} {...htmlProps}>
            {children}
        </StyledBodyText >
    );
}

const StyledBodyText = styled.p<{ color: string, size: number | string }>`
    color: ${(props) => props.color};
    font-size: ${(props) => (typeof props.size === 'number') ? props.size + "px" : props.size};
`

export default StyledBody;
