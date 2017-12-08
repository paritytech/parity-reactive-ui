const React = require('react');
const { Icon } = require('semantic-ui-react');

function createIcon (name, props = {}) {
	return <Icon name={ name } { ...props } />;
}

let Icons = {};

Icons.createIcon = createIcon;
Icons.AccountsIcon = (props) => createIcon('university', props);
Icons.AddIcon = (props) => createIcon('plus', props);
Icons.AddressIcon = (props) => createIcon('address book outline', props);
Icons.AppsIcon = (props) => createIcon('sitemap', props);
Icons.AttachFileIcon = (props) => createIcon('attach', props);
Icons.BackgroundIcon = (props) => createIcon('image', props);
Icons.CancelIcon = (props) => createIcon('cancel', props);
Icons.CheckIcon = (props) => createIcon('check', props);
Icons.CheckboxTickedIcon = (props) => createIcon('checkmark box', props);
Icons.CheckboxUntickedIcon = (props) => createIcon('square outline', props);
Icons.CloseIcon = (props) => createIcon('close', props);
Icons.CompareIcon = (props) => createIcon('exchange', props);
Icons.ComputerIcon = (props) => createIcon('desktop', props);
Icons.ContractIcon = (props) => createIcon('code', props);
Icons.CopyIcon = (props) => createIcon('copy', props);
Icons.DashboardIcon = (props) => createIcon('cubes', props);
// Duplicate below
Icons.DoneIcon = (props) => createIcon('check', props);
Icons.DeleteIcon = (props) => createIcon('trash', props);
Icons.DevelopIcon = (props) => createIcon('connectdevelop', props);
Icons.DialIcon = (props) => createIcon('text telephone', props);
Icons.EditIcon = (props) => createIcon('edit', props);
Icons.ErrorIcon = (props) => createIcon('exclamation circle', props);
Icons.EthernetIcon = (props) => createIcon('wifi', props);
Icons.FileIcon = (props) => createIcon('file outline', props);
Icons.FileDownloadIcon = (props) => createIcon('download', props);
Icons.FileUploadIcon = (props) => createIcon('upload', props);
Icons.FingerprintIcon = (props) => createIcon('target', props);
Icons.GasIcon = (props) => createIcon('settings', props);
Icons.GotoIcon = (props) => createIcon('arrow circle right', props);
Icons.InfoIcon = (props) => createIcon('info circle', props);
Icons.KeyIcon = (props) => createIcon('key', props);
Icons.KeyboardIcon = (props) => createIcon('keyboard', props);
Icons.LinkIcon = (props) => createIcon('linkify', props);
Icons.ListIcon = (props) => createIcon('list ul', props);
Icons.LockedIcon = (props) => createIcon('unlock alternate', props);
Icons.MembershipIcon = (props) => createIcon('id card outline', props);
Icons.MethodsIcon = (props) => createIcon('map signs', props);
Icons.MoveIcon = (props) => createIcon('move', props);
Icons.NextIcon = (props) => createIcon('chevron right', props);
Icons.PauseIcon = (props) => createIcon('pause', props);
Icons.PlayIcon = (props) => createIcon('play', props);
Icons.PrevIcon = (props) => createIcon('chevron left', props);
Icons.PrintIcon = (props) => createIcon('print', props);
Icons.QrIcon = (props) => createIcon('qrcode', props);
Icons.RefreshIcon = (props) => createIcon('refresh', props);
Icons.RemoveIcon = (props) => createIcon('remove', props);
Icons.ReorderIcon = (props) => createIcon('align justify', props);
Icons.ReplayIcon = (props) => createIcon('retweet', props);
Icons.SaveIcon = (props) => createIcon('save', props);
Icons.SearchIcon = (props) => createIcon('search', props);
Icons.SendIcon = (props) => createIcon('send', props);
Icons.SettingsIcon = (props) => createIcon('settings', props);
Icons.SnoozeIcon = (props) => createIcon('clock', props);
Icons.SortIcon = (props) => createIcon('filter', props);
Icons.StarIcon = (props) => createIcon('star', props);
Icons.StatusIcon = (props) => createIcon('signal', props);
Icons.UnlockedIcon = (props) => createIcon('unlock', props);
Icons.UpdateIcon = (props) => createIcon('cloud download', props);
Icons.UpdateWaitIcon = (props) => createIcon('wait', props);
Icons.VisibleIcon = (props) => createIcon('eye', props);
Icons.VerifyIcon = (props) => createIcon('shield', props);
Icons.VpnIcon = (props) => createIcon('world', props);

module.exports = { Icons };
