import React from 'react';
import styled from "styled-components";
import NoInspection from "@/Components/assets/icons/NoInspection";

const UpdatedProjects = () => {
    return (
        <Wrapper>
            <Title>
                Recently Updated Projects
            </Title>
            <ContentWrapp>
                <ContentHeader>
                    <ContentHeaderTitle>
                        Springfield I&I
                    </ContentHeaderTitle>
                </ContentHeader>
                <ContentBody>
                <ContentDataLeft>
                <IconWrapp>
                        <NoInspection/>
                    </IconWrapp>
                    <EmptyText>
                        No inspections
                    </EmptyText>
                </ContentDataLeft>
                    <RightSideWrapper>
                    <RightWrapper>
                <ContentDataRight>
                    <Assets>
                        <AssetsTitle>
                            Assets
                        </AssetsTitle>
                        <AssetsNumber>
                            0
                        </AssetsNumber>
                    </Assets>
                    <Assets>
                        <AssetsTitle>
                            Assigned
                        </AssetsTitle>
                        <AssetsNumber>
                            0
                        </AssetsNumber>
                    </Assets>
                </ContentDataRight>
                    </RightWrapper>
                    <BottomWrapper>
                <ContentDataBottom>
                        <Assets>
                            <AssetsTitle>
                                Total Distance Remaining
                            </AssetsTitle>
                            <AssetsNumber>
                                0/0
                            </AssetsNumber>
                        </Assets>

                    </ContentDataBottom>
                    </BottomWrapper>
                    </RightSideWrapper>
                    </ContentBody>
            </ContentWrapp>
        </Wrapper>
    );
};

export default UpdatedProjects;


const Wrapper = styled.div`
  //width: 50%;
`

const RightSideWrapper = styled.div`
    display: flex;
  flex-direction: column;
  width: 35%;
`

const RightWrapper = styled.div`

`

const BottomWrapper = styled.div`

`

const AssetsTitle = styled.div`
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
`

const ContentBody = styled.div`
    display: flex;
`

const ContentDataLeft = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ContentDataBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 24px;
`

const ContentDataRight = styled.div`
    width: 100%;
    display: flex;
  padding: 24px 24px 24px 0;
  justify-content: space-between;
`

const Assets = styled.div``

const AssetsNumber = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  padding-top: 10px;
`


const EmptyText = styled.div`
  font-size: 14px;
  padding-bottom: 24px;
`

const IconWrapp = styled.div`
  padding: 24px 24px 0 24px;
`

const ContentWrapp = styled.div`
  background-color: white;
`

const ContentHeader = styled.div`
    padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;

`

const ContentHeaderTitle = styled.div`
    color: #1890ff;
  display: flex;
  justify-content: flex-start;
  font-weight: 400;
  font-size: 18px;
  margin-left: 10px;
  margin-right: 10px;
`

const Title = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 21px;
  line-height: 32px;
  padding: 16px 24px;
`