import { Pressable, Text, TextInput, View } from 'app/design-system'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import React, { ForwardedRef, useState } from 'react'
import { TextProps } from 'app/design-system/text-input'
import { TextInput as rTextInput } from 'react-native'
import RecentlyAddedList from 'app/ui/recently-added-list'

export default function SearchView() {
  const [searchFraze, setSearchFraze] = useState('')
  const [tab, setTab] = useState<Tabs>('Beats')

  return (
    <View className="w-full max-w-6xl mx-auto flex-1 flex p-4">
      <SearchInputField
        value={searchFraze}
        onChangeText={setSearchFraze}
        showX={searchFraze !== ''}
        onXClick={() => {
          setSearchFraze('')
        }}
      />
      <TabBar selected={tab} onTabClick={setTab} />
      <View className="flex-1">
        <RecentlyAddedList />
      </View>
    </View>
  )
}

const SearchInputField = React.forwardRef(function SearchInputField(
  {
    showX,
    onXClick,
    ...rest
  }: TextProps & { showX?: boolean; onXClick?: () => void },
  ref: ForwardedRef<rTextInput>
) {
  return (
    <View className="w-full bg-white rounded-lg px-2 py-1 flex flex-row">
      <Icon name="magnify" color="black" size={24} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="black"
        className="grow ml-1"
        {...rest}
        ref={ref}
      />
      {showX && (
        <Pressable onPress={() => onXClick?.()}>
          <Icon name="close-circle-outline" color="black" size={24} />
        </Pressable>
      )}
    </View>
  )
})

type Tabs = 'Beats' | 'Beatmakers'

type TabBarProps = {
  selected: Tabs
  onTabClick?: (tab: Tabs) => void
}

function TabBar({ onTabClick, selected }: TabBarProps) {
  return (
    <View className="w-full flex flex-row">
      <Pressable className="grow py-4" onPress={() => onTabClick?.('Beats')}>
        <Text
          className={`${
            selected === 'Beats' ? 'text-white' : 'text-neutral-500'
          } text-sm mx-auto`}
        >
          Beats
        </Text>
      </Pressable>
      <Pressable
        className="grow py-4"
        onPress={() => onTabClick?.('Beatmakers')}
      >
        <Text
          className={`${
            selected === 'Beatmakers' ? 'text-white' : 'text-neutral-500'
          } text-sm mx-auto`}
        >
          Beatmakers
        </Text>
      </Pressable>
    </View>
  )
}
