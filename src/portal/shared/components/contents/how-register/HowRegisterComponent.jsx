import React, {Component} from 'react';

// Images
import elementAvatarImage from './shared/assets/images/element-avatar.svg';
import elementCurriculumImage from './shared/assets/images/element-curriculum.svg';
import elementEmployeeImage from './shared/assets/images/element-employee.svg';
import elementGroupImage from './shared/assets/images/element-group.svg';
import elementListImage from './shared/assets/images/element-list.svg';
import elementPhotoCameraImage from './shared/assets/images/element-photo-camera.svg';
import elementReportImage from './shared/assets/images/element-report.svg';
import elementSearchImage from './shared/assets/images/element-search.svg';
import simpleVectorImage from './shared/assets/images/vector.svg';
import vectorImage from '../../../../../landing/shared/components/sections/Information/shared/images/vector.svg';

// Styles
import './HowRegisterComponent.scss';

export class HowRegisterComponent extends Component {
  render() {
    return (
      <div className="portal-how-register">
        <div className="portal-how-register__block">
          <p className="portal-how-register__label">
            Регистрация на конкурс
          </p>

          <p className="portal-how-register__title">
            Для участия в конкурсе необходимо в период с 10 по 25 октября подать заявку на официальном сайте “Лидеры России
          </p>

          <p className="portal-how-register__subtitle">
            УСЛОВИЯ УЧАСТИЯ В КОНКУРСЕ:
          </p>

          <ul className="portal-how-register__list">
            <li className="portal-how-register__list-item">
              <div> <img src={vectorImage} alt="vector"/> </div>
              <div>Возраст до 55 лет включительно;</div>
            </li>
            <li className="portal-how-register__list-item">
              <div> <img src={vectorImage} alt="vector"/> </div>
              <div>Опыт управления* не менее двух лет для участников в возрасте до 35 лет включительно и опыт управления не менее 5 лет для участников в возрасте от 36 до 55 лет включительно.</div>
            </li>
            <li className="portal-how-register__list-item portal-how-register__list-star-item ">
              <div className="portal-how-register__list-star">*</div>
              <div>
              В новом потоке конкурса смогут принять участие иностранные граждане, готовые жить и работать в России и зарубежных подразделениях органах власти, коммерческих и некоммерческих структурах.
              </div>
            </li>
          </ul>
        </div>

        {/* Second block */}
        <div className="portal-how-register__block">
          <p className="portal-how-register__uptitle">
            По практике прошлого года, в качестве лидерского опыта засчитывались:
          </p>


          <p className="portal-how-register__subtitle">
            ПРИ РЕГИСТРАЦИИ НА КОНКУРС НЕОБХОДИМО ЗАПОЛНИТЬ АНКЕТУ С УКАЗАНИЕМ ВАШЕГО ЛИДЕРСКОГО ОПЫТА
          </p>

          <ul className="portal-how-register__list">
            <li className="portal-how-register__list-item">
              <div> <img src={vectorImage} alt="vector"/> </div>
              <div>Опыт на руководящих должностях по текущему и предыдущим местам работы;</div>
            </li>

            <li className="portal-how-register__list-item">
              <div> <img src={vectorImage} alt="vector"/> </div>
              <div>Функциональное руководство сотрудниками;</div>
            </li>

            <li className="portal-how-register__list-item">
              <div> <img src={vectorImage} alt="vector"/> </div>
              <div>Ведение социальных проектов;</div>
            </li>

            <li className="portal-how-register__list-item">
              <div> <img src={vectorImage} alt="vector"/> </div>
              <div>Лидерство в студенческих и волонтерских активностях.</div>
            </li>
          </ul>
        </div>

        {/* Third block */}
        <div className="portal-how-register__block">
          <p className="portal-how-register__subtitle">
          В НОВОМ ПОТОКЕ КОНКУРСА ВОЗМОЖЕН ДОПОЛНИТЕЛЬНЫЙ СБОР ИНФОРМАЦИИ ОБ УЧАСТНИКАХ ПО АККАУНТАМ В СОЦИАЛЬНЫХ СЕТЯХ
          </p>

          <p className="portal-how-register__uptitle" style={{marginBottom: 20}}>
            «Знакомство» через социальные сети позволяет составить определенный образ участника:
          </p>

          <ul className="portal-how-register__list">
            <li className="portal-how-register__list-item">
              <div> <img src={simpleVectorImage} alt="vector"/> </div>
              <div>Психологический портрет, психотип, характер, открытость/закрытость </div>
            </li>

            <li className="portal-how-register__list-item">
              <div> <img src={simpleVectorImage} alt="vector"/> </div>
              <div>Ценности, моральные установки, уровень культуры и воспитания, восприятие мира, мотивация, жизненные приоритеты</div>
            </li>

            <li className="portal-how-register__list-item">
              <div> <img src={simpleVectorImage} alt="vector"/> </div>
              <div>Хобби, увлечения и интересы, досуг, ритм жизни, круг общения</div>
            </li>

            <li className="portal-how-register__list-item">
              <div> <img src={simpleVectorImage} alt="vector"/> </div>
              <div>Эмоциональное состояние, настроение</div>
            </li>

            <li className="portal-how-register__list-item">
              <div> <img src={simpleVectorImage} alt="vector"/> </div>
              <div>Уровень агрессии, конфликтности</div>
            </li>

            <li className="portal-how-register__list-item">
              <div> <img src={simpleVectorImage} alt="vector"/> </div>
              <div>Общественная жизнь, гражданская позиция, политические взгляды </div>
            </li>

            <li className="portal-how-register__list-item">
              <div> <img src={simpleVectorImage} alt="vector"/> </div>
              <div>Профессиональные навыки, достижения</div>
            </li>

            <li className="portal-how-register__list-item">
              <div> <img src={simpleVectorImage} alt="vector"/> </div>
              <div>Репутация</div>
            </li>
          </ul>

          <div className="portal-how-register__centered-block">
            <h3>Элементы аккаунта, на которые нужно обратить внимание:</h3>

            <div className="need-element">
              <img src={elementAvatarImage} alt="avatar"/>
              <div className="need-element__description">
                <div className="need-element__description-title">
                  Фото на аватаре
                </div>
                <div className="need-element__description-text">
                  Эксперты обращают внимание на то, что изображено на аватаре: фотография самого участника, посторонняя символика или другие популярные личности. Презентабельное фото всегда смотрится выигрышно.
                </div>
              </div>
            </div>

            <div className="need-element">
              <img src={elementGroupImage} alt="avatar"/>
              <div className="need-element__description">
                <div className="need-element__description-title">
                  Количество и «качество» друзей, професииональные связи
                </div>
                <div className="need-element__description-text">
                  Большое количество контактов говорит об открытости участника, его социальной активности
                </div>
              </div>
            </div>

            <div className="need-element">
              <img src={elementReportImage} alt="avatar"/>
              <div className="need-element__description">
                <div className="need-element__description-title">
                  Лента новостей
                </div>
                <div className="need-element__description-text">
                По собственным постам, репостам и комментариям можно оценить уровень социализации участника, отношение к тем или иным профессиональным темам; определить ценности, мотивацию, гражданскую позицию и политические взгляды.
                </div>
              </div>
            </div>

            <div className="need-element">
              <img src={elementPhotoCameraImage} alt="avatar"/>
              <div className="need-element__description">
                <div className="need-element__description-title">
                  Фотографии
                </div>
                <div className="need-element__description-text">
                  По фотографиям можно определить, чем увлекается человек, какой у него кругозор, основные ценности. Положительно воспринимаются фото с деловых переговоров, тренингов, профессиональных конференций и т.п.
                </div>
              </div>
            </div>

            <div className="need-element">
              <img src={elementCurriculumImage} alt="avatar"/>
              <div className="need-element__description">
                <div className="need-element__description-title">
                  Участие в сообществах и группах
                </div>
                <div className="need-element__description-text">
                  Помогает определить интересы участника, ритм жизни, уровень конфликтности. Очевидно, что аккаунт не должен компрометировать человека. Компроматом в сетях служат: радикальные высказывания, участие в деструктивных группах, негативные заметки, нецензурные и непристойные материалы. Частое обсуждение конфликтных ситуаций или высказывание провокационных комментариев выявляет высокий уровень агрессии. Положительно воспринимаются посты об участии в конференциях, публикация фотографий, относящихся к профессиональной сфере деятельности, участие в тематических сообществах, репосты отраслевых новостей, дополненные авторскими комментариями.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="portal-how-register__block">
          <div className="portal-how-register__centered-block">
              <h3>Элементы аккаунта, на которые нужно обратить внимание:</h3>

              <div className="need-element">
                <img src={elementListImage} alt="avatar"/>
                <div className="need-element__description">
                  <div className="need-element__description-text">
                    Укажите настоящее имя, заполните разделы с работой и образованием, внесите Ваши личные и профессиональные интересы, поставьте на профиль хорошую фотографию — сделайте Ваш социальный портрет понятным для всех, кто вас не знает; 
                  </div>
                </div>
              </div>

              <div className="need-element">
                <img src={elementSearchImage} alt="avatar"/>
                <div className="need-element__description">
                  <div className="need-element__description-text">
                    Уточните настройки видимости: все откровенно личные фотографии и записи лучше скрыть от широкой аудитории. Внимательно посмотрите все, что осталось открытым для широкой аудитории: нет ли там расхождений с официальной информацией, которую Вы планируете указать в анкете участника.
                  </div>
                </div>
              </div>

              <div className="need-element">
                <img src={elementEmployeeImage} alt="avatar"/>
                <div className="need-element__description">
                  <div className="need-element__description-text">
                    Проанализируйте свои публикации и оцените, насколько они соответствуют имиджу, который Вы хотите сформировать. Регулярно пишите о своей профессиональной сфере: человек, который готов делиться новостями о своей профессии и уделяет этому время, вызывает уважение и интерес.
                  </div>
                </div>
              </div>
          </div>
        </div>

      </div>
    );
  }
}