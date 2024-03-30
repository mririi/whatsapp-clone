import React, { useCallback, useEffect, useState } from 'react'
import CustomDarkBackground from '@components/CustomDarkBackground'
import Icon from "react-native-vector-icons/FontAwesome";
import colors from '@constants/colors'
import normalize from 'react-native-normalize';
import CustomText from '@components/CustomText';
import CustomContactCard from '@components/CustomContactCard';
import { View } from 'react-native';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as contactsActions from '@store/actions/contacts';
import CustomLoading from '../../components/CustomLoading';
const Contacts = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [contacts,setContacts] = useState([])
    const contactsDATA = useSelector((state) => state.contacts.contacts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
          Alert.alert("An error occurred!", error, [{ text: "Ok" }]);
        }
      }, [error]);

    useEffect(() => {
        if (!contactsDATA) {
          setLoading(true);
        }
      }, [contactsDATA]);

      useEffect(() => {
        if (contactsDATA) {
          setContacts(contactsDATA);
        }
      }, [contactsDATA]);

      const loadContacts = useCallback(async () => {
        try {
          setError(null);
          dispatch(contactsActions.fetchContacts());
        } catch (err) {
          setError(err.message);
        }
      }, [dispatch, setError]);
      useEffect(() => {
        setLoading(true);
        loadContacts().then(() => {
          setLoading(false);
        });
      }, [dispatch, loadContacts]);
  return (
    <CustomDarkBackground>
        <>
        {loading && <CustomLoading />}
        {!loading && <><Icon
                name="plus"
                size={35}
                onPress={()=>{}}
                color={colors.textDark}
                style={{ position:"absolute",top:normalize(60),right:normalize(30) }}
            />
            <CustomText style={{marginTop:normalize(25)}}>Contacts</CustomText>
            <View style={{marginTop:normalize(20)}}>
            <FlatList
            data={contacts}
            renderItem={({item}) => (
                <CustomContactCard data={item} />
            )}
          />
                
            </View></>}
            </>
    </CustomDarkBackground>
  )
}

export default Contacts