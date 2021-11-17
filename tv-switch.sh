#!/bin/bash

current=$(xrandr | grep primary | cut -d " " -f1)
echo 'Current Primary Display:' $current

# Set primary monitor
if [ $current = 'DP-2' ]; then
    target="TV"
    xrandr --output HDMI-0 --primary
    sink="alsa_output.pci-0000_26_00.1.hdmi-stereo-extra3"
else
    target="PC"
    xrandr --output DP-2 --primary
    sink="alsa_output.pci-0000_28_00.4.analog-stereo"
fi

# Move audio to switched device
sinkId=$(pactl list short sinks | grep $sink | cut -f1)
pactl list short sink-inputs|while read stream; do
    streamId=$(echo $stream|cut '-d ' -f1)
    echo "moving stream $streamId"
    pactl move-sink-input "$streamId" "$sinkId"
done

notify-send "Switched to $target" "Switched primary output and sound to $target" -i /usr/share/icons/Pop/128x128/devices/video-display.png