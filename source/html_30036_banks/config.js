APP_CONFIG = {
	"options": {
		"version": "����� v2.1.2",
		"shortVersion": "v2.1.2",
		"timeout_page": "stat",
		"log": "true",
		"single_page_app": "true",
		"start_page": "1", "test_mode": "true"
	},
	"session": {
		"PrvId": "441",
		"PrvName": "Visa QIWI Wallet",
		"fiscal_receipt": "true"
	},
	"pages": {
		"1": {
			"class": "CheckStatusView",
			"preloader_text": "��������<br/>������",
			"prv_id": "441",
			"min_show_time": "2",
			"need_printer": "false",
			"nav_events": {
				"success": "10",
				"fail": "stat"
			},
			"provider-popup": {
				"title": "��������� ��������",
				"message": "���������� ��������� ������ �� ���� ���������",
				"closeButtonText": "OK"
			},
			"connection-popup": {
				"title": "����������� ������",
				"message": "���������� ��������� ������ �� ���� ���������",
				"closeButtonText": "OK"
			},
			"printer-popup": {
				"title": "������ ��������",
				"message": "���������� ��������� ������ �� ���� ���������",
				"closeButtonText": "OK"
			},
			"bik-error-popup": {
				"title": "������ ����������",
				"message": "������ �������� ���",
				"closeButtonText": "OK"
			}
		},
		"12": {
			"class": "CalculatorView",
			"nav_events": {
				"close": "10",
				"summ_enter": "6"
			}
		},
		"2": {
			"class": "OffertusView",
			"url": "data/offertus.html",
			"exit_page": "none",
			"comment": " ",
			"prev_page": "4",
			"load_error_popup": {
				"title": "������",
				"message": "���������� ��������� ��������� ������"
			}
		},
		"22": {
			"class": "OffertusView",
			"url": "data/contract.html",
			"exit_page": "none",
			"prev_page": "6"
		},
		"4": {
			"class": "PhoneEnterView",
			"preloader_text": "��������<br/>������",
			"header": "������� ��� ����� ��������",
			"comment": "��� (8) � ������� (���) ���-��-��",
			"maxChars": "10",
			"prev_page": "10",
			"nav_events": {
				"offertus": "2",
				"submitted": "5",
				"no_pin": "6",
				"favourites:submitted": "5",
				"favourites:no_pin": "13"
			},
			"wrong_number_popup": {
				"title": "�������� �����",
				"message": "����� <%=phone%> �� ������"
			}
		},
		"5": {
			"class": "PinEnterView",
			"preloader_text": "��������<br/>PIN-����",
			"header": "������� PIN ������ Visa QIWI Wallet",
			"comment": " ",
			"maxChars": "10",
			"nav_events": {
				"submitted": "6",
				"favourites:submitted": "13"
			},
			"exit_page": "none",
			"prev_page": "4"
		},
		"6": {
			"class": "SummEnterView",
			"header": "������� ����� �������",
			"comment": " ",
			"nav_events": {
				"contract": "22",
				"submitted": "7",
				"phone": "4",
				"favs": "13",
				"combo": "10",
				"calculator": "12"
			},
			"max_sum_popup": {
				"title": "������ �����",
				"message": "������������ ����� ������� �� ������ ��������� ���������� <%=maxSumm%> ���."
			},
			"max_bank_sum_popup": {
				"title": "������ �����",
				"message": "������������ ����� ������� � ���� ���� ���������� <%=maxBankSumm%> ���."
			},
			"min_sum_popup": {
				"title": "������ �����",
				"message": "����������� ����� ������� �� ������ ��������� ���������� <%=minSumm%> ���."
			}
		},
		"7": {
			"class": "ConfirmationView",
			"header": "��������� ������������ ������",
			"comment": " ",
			"prev_page": "6",
			"next_page": "8"
		},
		"8": {
			"class": "PaymentMethodView",
			"preloader_text": "��������<br/>������",
			"header": "�������� ������ ������",
			"comment": " ",
			"prev_page": "7",
			"nav_events": {
				"cash": "9",
				"balance": "11"
			}
		},
		"9": {
			"class": "CashPaymentView",
			"preloader_text": "���������� ������<br/>��������� ����",
			"exit_page": "none",
			"prev_page": "none",
			"header": " ",
			"comment": " ",
			"payment_options": {
				"PrvId": {
					"key": "PrvId"
				},
				"AccNum": {
					"key": "phone"
				},
				"PrvName": {
					"key": "PrvName"
				},
				"_extra_ev_scode": {
					"key": "transaction_id"
				},
				"_extra_comment": {
					"key": "comment"
				},
				"_extra_ev_trm_id": {
					"key": "TermID"
				}
			},
			"nav_events": {
				"success": "110",
				"fail": "110",
				"zero_cash": "stat",
				"validator_error": "stat",
				"validator_timeout": "stat"
			}
		},
		"11": {
			"class": "BalancePaymentView",
			"preloader_text": "��������<br/>�������",
			"header": " ",
			"comment": " ",
			"prev_page": "8",
			"nav_events": {
				"cash": "9",
				"enough": "110"
			}
		},
		"10": {
			"class": "ComboView",
			"preloader_text": "��������<br/>������",
			"nav_events": {
				"submitted": "4",
				"fav_change:submitted": "6",
				"calculator": "12",
				"favourites": "4"
			}
		},
		"13": {
			"class": "FavouritesView",
			"header": "���� ���������� �������",
			"preloader_text": "�������� �����<br/>��������",
			"prev_page": "10",
			"next_page": "6",
			"nav_events": {
				"online_error": "4",
				"no_favs": "10",
				"fav_change": "10",
				"next": "6"
			}
		},
		"110": {
			"class": "FinalView",
			"header": "������ ������"
		},
		"stat": {
			"class": "StatisticsView"
		}

	}
};
