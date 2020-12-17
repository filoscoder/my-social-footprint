import { FlexContainer } from '../../components/containers/flexContainer';
import { IgAccountType } from './types';
import React from 'react';
import palette from '../../lib/styles/palette'
import styled from 'styled-components';

interface IgDashboardProps extends React.HTMLProps<HTMLDivElement> {
    currentAccount: IgAccountType,
    handleLoader: (isLoaded: boolean) => void
};

export const IgDashboard: React.FC<IgDashboardProps> = ({ handleLoader }) => {

    return (
        <FlexContainer>
            <DashboardHeader onClick={() => handleLoader(true)}>
                Dashboard
            </DashboardHeader>
        </FlexContainer>
    );
}


const DashboardHeader = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;