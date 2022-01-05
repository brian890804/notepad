import React from 'react';
import {
    Dimensions,
    StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';

import TagInput from './react-native-tags-input';

const mainColor = "#fe817f";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {
                tag: '',
                tagsArray: []
            },
            tagsColor: '#fff',
            tagsText: mainColor,
            getTagsValue: props.getTagsValue
        };
    }

    updateTagState = (state) => {
        this.setState({
            tags: state
        })
        this.state.getTagsValue(this.state.tags.tagsArray)
    };
    render() {

        return (
            <TagInput
                updateState={this.updateTagState}
                tags={this.state.tags}
                placeholder="請輸入發送城市"
                labelStyle={{ color: '#fff' }}
                leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText} />}
                leftElementContainerStyle={{ marginLeft: 3 }}
                containerStyle={{ width: (Dimensions.get('window').width - 40) }}
                inputContainerStyle={[styles.textInput, { backgroundColor: this.state.tagsColor }]}
                inputStyle={{ color: this.state.tagsText }}
                onFocus={() => this.setState({ tagsColor: mainColor, tagsText: '#fff' })}
                onBlur={() => this.setState({ tagsColor: '#fff', tagsText: mainColor })}
                autoCorrect={false}
                tagStyle={styles.tag}
                tagTextStyle={styles.tagText}
                keysForTag={', '} />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 1,
        marginBottom: 10
    },
    tag: {
        backgroundColor: '#fff'
    },
    tagText: {
        color: mainColor
    },
});