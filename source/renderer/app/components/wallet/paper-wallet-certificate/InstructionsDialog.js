// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import Dialog from '../../widgets/Dialog';
import DialogCloseButton from '../../widgets/DialogCloseButton';
import styles from './InstructionsDialog.scss';

const messages = defineMessages({
  headline: {
    id: 'paper.wallet.create.certificate.instructions.dialog.headline',
    defaultMessage: '!!!Create a paper wallet certificate',
    description: 'Headline for the "Paper wallet create certificate instructions dialog".'
  },
  subtitle: {
    id: 'paper.wallet.create.certificate.instructions.dialog.subtitle',
    defaultMessage: '!!!Create a paper wallet certificate for offline storage of funds.',
    description: 'Subtitle for the "Paper wallet create certificate instructions dialog".'
  },
  instructionsListLabel: {
    id: 'paper.wallet.create.certificate.instructions.dialog.instructionsList.label',
    defaultMessage: '!!!Instructions',
    description: 'Instructions list label for the "Paper wallet create certificate instructions dialog".'
  },
  instructionsListDefinition1: {
    id: 'paper.wallet.create.certificate.instructions.dialog.instructionsList.definition1',
    defaultMessage: '!!!Your printed certificate will include your paper wallet recovery phrase of 24 words. Note that your paper wallet recovery phrase is different to the 12-words recovery phrases used to restore your regular Daedalus wallet.',
    description: 'Wallet certificate create instructions dialog definition 1.',
  },
  instructionsListDefinition2: {
    id: 'paper.wallet.create.certificate.instructions.dialog.instructionsList.definition2',
    defaultMessage: '!!!For security reasons, the last 9 words of your paper wallet recovery phrase will not be printed on the paper wallet certificate itself. You will need to write them on your certificate by hand in a moment.',
    description: 'Wallet certificate create instructions dialog definition 2.',
  },
  instructionsListDefinition3: {
    id: 'paper.wallet.create.certificate.instructions.dialog.instructionsList.definition3',
    defaultMessage: '!!!Use the address on your certificate to send funds to your paper wallet.',
    description: 'Wallet certificate create instructions dialog definition 3.',
  },
  instructionsListDefinition4: {
    id: 'paper.wallet.create.certificate.instructions.dialog.instructionsList.definition4',
    defaultMessage: '!!!Your paper wallet will be offline so will not be held in Daedalus. To check the balance of the wallet, input the address on the certificate into',
    description: 'Wallet certificate create instructions dialog definition 4.',
  },
  instructionsListDefinition5: {
    id: 'paper.wallet.create.certificate.instructions.dialog.instructionsList.definition5',
    defaultMessage: '!!!Store your certificate containing your paper wallet recovery phrase in a safe place.',
    description: 'Wallet certificate create instructions dialog definition 5.',
  },
  printingInstructions: {
    id: 'paper.wallet.create.certificate.instructions.dialog.printingInstructions',
    defaultMessage: '!!!When you click “Save PDF file for printing” you will be prompted to choose a location on your computer where the PDF file will be saved. After that open the saved PDF file and print it.',
    description: 'Wallet certificate create instructions dialog - printing instructions.',
  },
  cardanoExplorer: {
    id: 'paper.wallet.create.certificate.instructions.dialog.cardanoExplorer',
    defaultMessage: '!!!Cardano Explorer',
    description: 'Wallet certificate create instructions dialog "Cardano Explorer" label'
  },
  printButtonLabel: {
    id: 'paper.wallet.create.certificate.instructions.dialog.button.printLabel',
    defaultMessage: '!!!Save PDF file for printing',
    description: '"Wallet certificate create instructions dialog" print button label.'
  },
});

type Props = {
  inProgress: boolean,
  onPrint: Function,
  onClose: Function,
  onOpenExternalLink: Function,
};

const CARDANO_EXPLORER_LINK = 'https://cardanoexplorer.com';

@observer
export default class InstructionsDialog extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const { onClose, onPrint, inProgress, onOpenExternalLink } = this.props;
    const dialogClasses = classnames([
      styles.component,
      'instructionsDialog',
    ]);

    const printButtonClasses = classnames([
      'printButton',
      inProgress ? styles.submitButtonSpinning : null,
    ]);

    const actions = [
      {
        className: printButtonClasses,
        label: intl.formatMessage(messages.printButtonLabel),
        primary: true,
        onClick: onPrint,
      }
    ];

    const cardanoExplorerLink = (
      <span
        className={styles.link}
        onClick={() => onOpenExternalLink(CARDANO_EXPLORER_LINK)}
        role="link"
        aria-hidden
      >
        {intl.formatMessage(messages.cardanoExplorer)}
      </span>
    );

    return (
      <Dialog
        className={dialogClasses}
        title={intl.formatMessage(messages.headline)}
        actions={actions}
        closeOnOverlayClick
        onClose={onClose}
        closeButton={<DialogCloseButton />}
      >

        <div className={styles.instructionsContentWrapper}>
          <p className={styles.subtitle}>{intl.formatMessage(messages.subtitle)}</p>
          <div className={styles.instructionsList}>

            <p className={styles.instructionsListLabel}>
              {intl.formatMessage(messages.instructionsListLabel)}
            </p>

            <ul>
              <li>{intl.formatMessage(messages.instructionsListDefinition1)}</li>
              <li>{intl.formatMessage(messages.instructionsListDefinition2)}</li>
              <li>{intl.formatMessage(messages.instructionsListDefinition3)}</li>
              <li>
                <FormattedMessage
                  {...messages.instructionsListDefinition4}
                  values={{ link: cardanoExplorerLink }}
                />
              </li>
              <li>{intl.formatMessage(messages.instructionsListDefinition5)}</li>
            </ul>

          </div>

          <p className={styles.printingInstructions}>
            <strong>{intl.formatMessage(messages.printingInstructions)}</strong>
          </p>

        </div>

      </Dialog>
    );
  }
}
