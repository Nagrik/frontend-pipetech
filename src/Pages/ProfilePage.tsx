import React, {useRef, useState} from 'react';
import Header from "@/Components/Header";
import styled from "styled-components";
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";
import ArrowDownIcon from "@/Components/common/icons/AssetsPageIcons/ArrowDownIcon";

const ProfilePage = () => {

    const [preferences, setPreferences] = useState<string | null>(null)
    const [preferencesOpen, setPreferencesOpen] = useState<boolean>(false)

    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const onUploadChange = async (e: any) => {
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file)
    }
    const onAddClick = () => {
        hiddenFileInput.current!.click();
    }

    const preferencesRef = useOnClickOutside(() => {
        setPreferencesOpen(false);
    });
    return (
        <div>
            <Header/>
            <ProfileHeader>
                <ProfileHeaderTitle>
                    My Profile
                </ProfileHeaderTitle>
                <SaveButton>
                    Save Profile
                </SaveButton>
            </ProfileHeader>
            <ProfileContent>
                <ProfileContentBody>
                    <ChoosePhoto>
                        <Input type="file" ref={hiddenFileInput} onChange={onUploadChange} id="file" name="file" accept="image/*" />
                    </ChoosePhoto>
                    <Photo onClick={onAddClick}>
                        <PhotoInitial>
                        RN
                        </PhotoInitial>
                    </Photo>
                    <Right>
                    <ContactInfo>
                        <ContactTitle>
                            Contact Information
                        </ContactTitle>
                    </ContactInfo>
                    <InputRow>
                        <InputTitle>
                            First Name: &nbsp;
                        </InputTitle>
                        <InputForm />
                    </InputRow>
                        <InputRow>
                            <InputTitle>
                                Last Name: &nbsp;
                            </InputTitle>
                            <InputForm />
                        </InputRow>
                        <ContactInfo style={{paddingTop: '40px'}}>
                            <ContactTitle>
                                Preferences
                            </ContactTitle>
                        </ContactInfo>
                        <InputRow>
                            <InputTitle>
                                Unit Preferences: &nbsp;
                            </InputTitle>
                            <Preferenses >
                                <Preview active={preferencesOpen} onClick={() => {
                                    setTimeout(() => {
                                        setPreferencesOpen(true)

                                    }, 0.1);
                                }}>
                                    {preferences ? preferences : 'Select'}
                                    <IconWrapp>
                                        <ArrowDownIcon/>
                                    </IconWrapp>
                                </Preview>
                                {
                                    preferencesOpen && (
                                        <MenuOpen ref={preferencesRef}>
                                            <MenuItem onClick={() => {
                                                setPreferencesOpen(false)
                                                setPreferences('Imperial')
                                            }}>
                                                Imperial
                                            </MenuItem>
                                            <MenuItem onClick={() => {
                                                setPreferencesOpen(false)
                                                setPreferences('Metric')
                                            }}>
                                                Metric
                                            </MenuItem>
                                        </MenuOpen>

                                    )
                                }
                            </Preferenses>

                        </InputRow>
                    </Right>
                </ProfileContentBody>
            </ProfileContent>
        </div>
    );
};

export default ProfilePage;

const Preview = styled.div<{active:boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.active ? '#ccc' : '#000'};
`

const IconWrapp = styled.div`
    margin-top: 2px;
`

const ProfileContent = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuOpen = styled.div`
    position: absolute;
  top: 35px;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)
`

const MenuItem = styled.div`
  padding: 10px;
  &:hover {
    background-color: #e6f7ff;
  }
`

const Preferenses = styled.div`
  border: 1px solid #d9d9d9;
  padding: 5px 10px;
  width: 100%;
  cursor: pointer;
  position: relative;
  &:focus {
    border: 1px solid #1890ff;
  }
  &:hover {
    border: 1px solid #1890ff;
  }
`

const InputForm = styled.input`
  border: 1px solid #d9d9d9;
  padding: 3px 10px;
  width: 100%;
  &:focus {
    border: 1px solid #1890ff;
  }
  &:hover {
    border: 1px solid #1890ff;
  }
`

const Right = styled.div`
    display: flex;
  flex-direction: column;
  width: 335px;
`

const InputRow = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0px 0px 20px;
`

const InputTitle = styled.div`
  font-size: 16px;
  width: 130px;
  white-space: nowrap;
`

const ContactTitle = styled.div`
    font-size: 18px;
  color: rgba(0, 0, 0, 0.45);

`

const PhotoInitial = styled.div`
  width: 32px;
  height: 32px;
  color: white;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Photo = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f5f5f5;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Input = styled.input`
  display: none;
`

const ProfileContentBody = styled.div`
  background-color: #fff;
  padding: 24px;
  display: flex;
`

const ChoosePhoto = styled.div`
`

const ContactInfo = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 5px 24px 5px 0px;
  margin-left: 20px;

`

const ProfileHeader = styled.div`
  display: flex;
  padding: 24px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
`

const ProfileHeaderTitle = styled.div`
  font-size: 21px;
  font-weight: 500;
`

const SaveButton = styled.div`
  font-size: 14px;
  color: white;
  background-color: #1890ff;
  padding: 12px;
  cursor: pointer;
`