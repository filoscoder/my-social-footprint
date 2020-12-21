import React from 'react';
import palette from '../../lib/styles/palette'
import styled from 'styled-components';

type FontWeightType = "normal" | "bold" | "bolder" | "lighter" | "initial" | "inherit";
interface StyledTextProps extends React.HTMLProps<HTMLFontElement> {
    color?: string,
    fontSize?: number | string,
    fontWeight?: number | FontWeightType,
};

const StyledText: React.FC<StyledTextProps> = (props) => {
    const { color = 'inherit', fontSize = 'inherit', fontWeight = 'inherit', children, ...rest } = props;
    const htmlProps = rest as any;
    return (
        <StyledTextBody color={color} size={fontSize} weight={fontWeight} {...htmlProps}>
            {children}
        </StyledTextBody >
    );
}

const StyledTextBody = styled.p<{ color: string, size: number | string, weight: number | FontWeightType }>`
    margin: 0;
    padding: 0;
    color: ${(props) => props.color};
    font-size: ${(props) => (typeof props.size === 'number') ? props.size + "px" : props.size};
    font-weight: ${(props) => props.weight};
`

export default StyledText;
